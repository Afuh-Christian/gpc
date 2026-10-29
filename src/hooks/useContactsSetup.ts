import { useEffect, useState } from 'react';
import { Contacts, PhoneType } from '@capacitor-community/contacts';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface FirestoreContact {
  givenName: string;
  familyName: string;
  phones: { type: string; number: string }[];
}

function normalizePhone(num: string): string {
  return num.replace(/\D/g, '');
}

export function useContactsSetup(): { syncDone: boolean; permDenied: boolean } {
  const [syncDone, setSyncDone] = useState(!Capacitor.isNativePlatform());
  const [permDenied, setPermDenied] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    async function syncContacts() {
      try {
        const { contacts: current } = await Contacts.checkPermissions();

        if (current === 'denied') {
          setPermDenied(true);
          return;
        }

        const { contacts: status } = await Contacts.requestPermissions();
        if (status !== 'granted') { App.exitApp(); return; }

        setPermDenied(false);

        const snapshot = await getDocs(collection(db, 'contacts'));
        const remoteContacts = snapshot.docs.map(d => d.data() as FirestoreContact);
        if (!remoteContacts.length) { setSyncDone(true); return; }

        const { contacts: deviceContacts } = await Contacts.getContacts({
          projection: { name: true, phones: true },
        });

        const deviceNumbers = new Set<string>();
        for (const c of deviceContacts) {
          for (const p of c.phones ?? []) {
            if (p.number) deviceNumbers.add(normalizePhone(p.number));
          }
        }

        for (const contact of remoteContacts) {
          const alreadyExists = contact.phones.some(p =>
            deviceNumbers.has(normalizePhone(p.number))
          );
          if (!alreadyExists) {
            await Contacts.createContact({
              contact: {
                name: { given: contact.givenName, family: contact.familyName },
                phones: contact.phones.map(p => ({
                  type: PhoneType.Mobile,
                  number: p.number,
                })),
              },
            });
          }
        }
      } catch (e) {
        console.error('Contacts sync error:', e);
      } finally {
        setSyncDone(true);
      }
    }

    syncContacts();

    const listener = App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) syncContacts();
    });

    return () => { listener.then(h => h.remove()); };
  }, []);

  return { syncDone, permDenied };
}
