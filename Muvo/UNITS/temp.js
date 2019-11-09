class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.json;

        this.pin = this.pin.bind(this);
        this.offerHelp = this.offerHelp.bind(this);
        this.pinStatus = this.pinStatus.bind(this);
        this.offerHelpStatus = this.offerHelpStatus.bind(this);

        this.state.pinStatus = this.pinStatus();
        this.state.offerHelpStatus = this.offerHelpStatus();
    }

    pinStatus() {
    }

    togglePin() {
    }

    offerHelpStatus() {
    }

    toggleOfferHelp() {
    }

}