import { createAction } from '@reduxjs/toolkit';

const changeFilter = createAction('phone/setFilter');

export const fetchContactsRequest = createAction('phone/fetchContactsRequest');
export const fetchContactsSuccess = createAction('phone/fetchContactsSuccess');
export const fetchContactsError = createAction('phone/fetchContactsError');

export const addContactRequest = createAction('phone/addContactRequest');
export const addContactSuccess = createAction('phone/addContactSuccess');
export const addContactError = createAction('phone/addContactError');

export const deleteContactRequest = createAction('phone/deleteContactRequest');
export const deleteContactSuccess = createAction('phone/deleteContactSuccess');
export const deleteContactError = createAction('phone/deleteContactError');

export const editContactRequest = createAction('phone/editContactRequest');
export const editContactSuccess = createAction('phone/editContactSuccess');
export const editContactError = createAction('phone/editContactError');

const actions = {
  changeFilter,
};

export default actions;
