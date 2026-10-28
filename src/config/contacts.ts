import { PhoneType } from '@capacitor-community/contacts';
import type { ContactInput } from '@capacitor-community/contacts';

export const CONTACTS_TO_ADD: ContactInput[] = [
  {
    name: { given: 'Afuh', family: 'Chris' },
    phones: [{ type: PhoneType.Mobile, number: '677828272' }],
  },
  // Add more contacts here:
  // {
  //   name: { given: 'Jane', family: 'Doe' },
  //   phones: [{ type: PhoneType.Mobile, number: '699000000' }],
  // },
];
