class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.json;
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }
    async runAsync(url, method = "PUT", body = "") {
        var response = await fetch(url, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer',
            body: body
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    delete() {
        var url = `/tasks?id=${this.state._id}`;
        this.runAsync(url, 'DELETE').then(data => {
            if (data.status == 200) {
                viewAll();
            }
        });
    }
    edit() {
        console.log("edited: ", this.state._id);
    }

    render() {
        return (
            <div className="tasks card mb-1">
                <h5 className="view-task-post-user card-header">
                    {this.state.user}
                    <small className="view-task-post-date">
                        &nbsp;{this.state.date}, {this.state.time}
                    </small>
                </h5>
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
                <div className="card-footer bg-light">
                    <div>
                        Favorited by: {this.state.favorites.map(item => <span key={item}>{item}, </span>)}
                    </div>
                    <div>
                        Requested by: {(this.state.requests) && (this.state.requests.map(item => <span key={item}>{item}, </span>))}
                    </div>    
                </div>
                <div className="card-footer">
                    <button className="btn btn-warning mr-1 text-dark" onClick={this.edit}>
                        Edit
                    </button>
                    <button className="btn btn-danger ml-1" onClick={this.delete}>
                        Delete
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
    getData("/tasks?user=loggedIn").then((data) => {
        console.log(data);
        ReactDOM.render(data.map((item) => <Task key={item._id} json={item} />), document.getElementById('view-my-tasks'));
    });

}

