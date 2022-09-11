import Container from '../../components/Container/';
import ContactList from '../../components/ContactList/';
import SearchForm from '../../components/SearchForm/';
import ContactForm from '../../components/ContactForm/';
import s from '../ContactsPage/ContactsPage.module.css';

export default function ContactPage() {
  return (
    <div>
      <Container>
        <h1>Phonebook</h1>
        <div className={s.Table}>
          <div>
            <h2 className={s.ListName}>Adding contacts</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className={s.ListName}>Contacts list</h2>
            <SearchForm />
            <ContactList />
          </div>
        </div>
      </Container>
    </div>
  );
}
