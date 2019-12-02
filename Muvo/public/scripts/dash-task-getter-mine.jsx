var obj = {};

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.json;
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.lock = this.lock.bind(this);
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
    lock() {
        var url = `/locktask?id=${this.state._id}&stat=${this.state.locked == true ? "false" : "true"}`;

        this.runAsync(url).then(data => {
            console.log(data.status);
            if (data.status == 200) {
                this.setState({ locked: this.state.locked ^ 1 });
                viewAll();
            }
        });
    }
    edit() {
        obj = this.state;
        $("#edit-task-form textarea[name=description]").val(this.state.description);
        $("#edit-task-form input[name=fromStreet]").val(this.state.fromStreet);
        $("#edit-task-form input[name=fromCity]").val(this.state.fromCity);
        $("#edit-task-form input[name=fromState]").val(this.state.fromState);
        $("#edit-task-form input[name=fromZip]").val(this.state.fromZip);
        $("#edit-task-form input[name=toStreet]").val(this.state.toStreet);
        $("#edit-task-form input[name=toCity]").val(this.state.toCity);
        $("#edit-task-form input[name=toState]").val(this.state.toState);
        $("#edit-task-form input[name=toZip]").val(this.state.toZip);
        $("#edit-task-form input[name=date]").val(this.state.date);
        $("#edit-task-form input[name=time]").val(this.state.time);
        $("#edit-task-form input[name=difficulty]").val(this.state.difficulty);
        $("#edit-task-form input[name=skillsRequired]").val(this.state.skillsRequired);
        $("#edit-task-form input[name=estimatedTime]").val(this.state.estimatedTime);
        $("#edit-task-form input[name=pay]").val(this.state.pay);
        $('#edit-task-form').attr('action', '/tasks?id=' + this.state._id);
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
                <div className="card-footer bg-light">
                    <div>
                        Favorited by: {this.state.favorites.map(item => <span key={item.username}><a href={"mailto:" + item.email}>{item.username}</a>, </span>)}
                    </div>
                    <div>
                        Requested by: {(this.state.requests) && (this.state.requests.map(item => <span key={item.username}><a href={"mailto:" + item.email}>{item.username}</a>, </span>))}
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-warning mr-1 text-dark" onClick={this.edit} data-toggle="modal" data-target="#editTask">
                        Edit
                    </button>
                    <button className="btn btn-warning ml-1" onClick={this.lock}>
                        {this.state.locked ? "✔ Locked" : "Lock"}
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


var editTask = async function (url = $('#edit-task-form').attr('action')) {
    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('edit-task-form'))) {
        data.append(pair[0], pair[1]);
    }
    data.append("description", $("#edit-task-form textarea[name=description]").val());
    var response = await fetch(url, {
        method: 'put',
        body: data,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit

    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

var viewAll = () => {
    getData("/tasks?user=loggedIn").then((data) => {
        console.log(data);
        ReactDOM.render(data.map((item) => <Task key={item._id} json={item} />), document.getElementById('view-my-tasks'));
    });

}

