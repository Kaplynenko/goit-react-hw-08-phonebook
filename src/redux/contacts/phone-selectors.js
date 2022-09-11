import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.contacts.loading;

const getFilter = state => state.contacts.filter;

const arrayContact = state => state.contacts;

const getVisibleContacts = createSelector(
  [arrayContact, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);

const contactSelectors = {
  getLoading,
  getFilter,
  arrayContact,
};
export default contactSelectors;
