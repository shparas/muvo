class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.json;
        this.favorite = this.favorite.bind(this);
        this.requestHelp = this.requestHelp.bind(this);
    }
    async runAsync(url) {
        var response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer'
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    favorite() {
        var url = `/favorite?id=${this.state._id}&stat=${this.state.isFavorite ^ 1}`;
        this.runAsync(url).then(data => {
            if (data.status == 200) {
                this.setState({ isFavorite: this.state.isFavorite ^ 1 });
            }
        });
    }

    requestHelp() {
        var url = `/requestHelp?id=${this.state._id}&stat=${this.state.hasRequested ^ 1}`;
        this.runAsync(url).then(data => {
            if (data.status == 200) {
                this.setState({
                    hasRequested: this.state.hasRequested ^ 1,
                    isFavorite: this.state.isFavorite || !this.state.hasRequested
                });
            }
        });
    }

    render() {
        return (
            <div className="tasks card mb-1">
                <div className="position-relative" >
                    <img className="card-icon" src={"/images/" + this.state.userImg} />
                    <h5 className="card-header">
                        {this.state.user}
                        <small className="view-task-post-date">
                            &nbsp;{this.state.date}, {this.state.time}
                        </small>
                    </h5>
                </div>
                <div className="card-body">
                    <div className="view-task-description">
                        Description: {this.state.description}
                    </div>
                    <div className="view-task-from">
                        From Address: {this.state.fromStreet}, {this.state.fromCity}, {this.state.fromState} {this.state.fromZip}
                    </div>
                    <div className="view-task-to">
                        To Address: {this.state.toStreet}, {this.state.toCity}, {this.state.toState} {this.state.toZip}
                    </div>
                    <div className="view-task-difficulty">
                        Difficulty: {this.state.difficulty == 0 ? "Easy" : (this.state.difficulty == 1 ? "A little" : "Hard")}
                    </div>
                    <div className="view-task-skills">
                        Special Skills Required: {this.state.skillsRequired == 0 ? "No" : "Yes"}
                    </div>
                    <div className="view-task-time-required">
                        Estimated Time: {this.state.estimatedTime}
                    </div>
                    <div className="view-task-pay">
                        Pay rate: {this.state.pay}
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-warning mr-1 text-dark" onClick={this.favorite}>
                        {this.state.isFavorite ? "✔ Favorited" : "Favorite"}
                    </button>
                    <button className="btn btn-primary ml-1" onClick={this.requestHelp}>
                        {this.state.hasRequested ? "✔ Requested" : "Request to help"}
                    </button>
                </div>
            </div>
        );
    }
}

var getData = async function (url = "/tasks") {
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

var viewAll = () => {
    getData("/tasks").then((data) => {
        ReactDOM.render(data.map((item) => <Task key={item._id} json={item} />), document.getElementById('view-all-tasks'));
    });

}
var viewFavorites = () => {
    getData("/tasks").then((data) => {
        ReactDOM.render(data.map((item) => item.isFavorite && <Task key={item._id} json={item} />), document.getElementById('view-favorite-tasks'));
    });
}
viewFavorites();
