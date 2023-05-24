import React from 'react';
import './UserAddForm.css';

class UserAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            salariu: '',
            image: null, // Adăugăm un câmp pentru a reține imaginea
            isGoldClient: false
        };
    }

    updateName(event) {
        this.setState({ name: event.target.value });
    }

    updateEmail(event) {
        this.setState({ email: event.target.value });
    }

    updateSalariu(event) {
        this.setState({ salariu: event.target.value });
    }

    updateImage(event) {
        const file = event.target.files[0]; // Obțineți fișierul selectat
        
        this.setState({ image: file }); // Actualizați starea cu fișierul selectat
      }
      

    updateIsGoldClient(event) {
        this.setState({ isGoldClient: event.target.checked });
    }

    render() {
        const { name, email, salariu, image, isGoldClient } = this.state;
        const { submitAddForm } = this.props;

        return (
            <form
                className="user-add-form"
                onSubmit={(event) => submitAddForm(event, name, email, salariu, image, isGoldClient)}
            >
                <h2>Adauga utilizatori:</h2>
                <label htmlFor="name">Nume:</label>
                <input
                    type="text"
                    name="name"
                    onChange={(event) => this.updateName(event)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    onChange={(event) => this.updateEmail(event)}
                />
                <label htmlFor="salariu">Salariu:</label>
                <input
                    type="number"
                    name="salariu"
                    onChange={(event) => this.updateSalariu(event)}
                />
                <label htmlFor="image">Imagine:</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*" // 
                    onChange={(event) => this.updateImage(event)}
                />
                <label htmlFor="is-gold-client">Client GOLD</label>
                <input
                    type="checkbox"
                    name="is-gold-client"
                    value="true"
                    onChange={(event) => this.updateIsGoldClient(event)}
                />

                <input type="submit" value="Introdu utilizatorul" />
            </form>
        )
    }
}

export default UserAddForm;
