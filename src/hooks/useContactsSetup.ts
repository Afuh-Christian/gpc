import { useEffect } from 'react';
import { Contacts } from '@capacitor-community/contacts';
import { Capacitor } from '@capacitor/core';
import { CONTACTS_TO_ADD } from '../config/contacts';

export function useContactsSetup() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    async function setupContacts() {
      try {
        const { contacts: status } = await Contacts.requestPermissions();
        if (status !== 'granted') return;

        for (const contact of CONTACTS_TO_ADD) {
          await Contacts.createContact({ contact });
        }
      } catch (e) {
        console.error('Contacts setup error:', e);
      }
    }

    setupContacts();
  }, []);
}
