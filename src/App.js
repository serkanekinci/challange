import React, {Component} from "react";
import "./App.css";
import axios from "axios";
import logo from "./favicon.ico";
import profile from "./profile.png";
import {Button, ListGroup, ListGroupItem, Row, Col, FormGroup, InputGroup, FormControl} from "react-bootstrap";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {itemArr: [], value: "", date: ""};

    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={profile} className="profile_image"/>
                    <span style={{float: "left", marginTop: 10}}>
                        <ul>Serkan Ekinci , 25</ul>
                        <ul>istanbul</ul></span>

                    <span style={{float: "right"}}>
                        <ul >
                            <img src={logo} className="button_image"/>
                            <img src={logo} className="button_image"/>
                        </ul>
                        <ul>
                            <img src={logo} className="button_image"/>
                            <img src={logo} className="button_image"/>
                        </ul>
                    </span>
                </div>

                <div className="App-intro">
                    <Row>
                        <Button style={{
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: "auto",
                            marginRight: "auto",
                            background: "skyblue",
                        }}
                                onClick={() => this.__getChat(this.state.date)}>
                            DAHA FAZLA
                        </Button>
                    </Row>
                    <Row>
                        <Col >
                            <ListGroup style={{
                                height: 300, width: 500,
                                marginLeft: "auto",
                                marginRight: "auto",
                                overflowX: "auto",
                                overflowY: "auto"
                            }}>
                                {this.state.itemArr}
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text"
                                             name="value"
                                             value={this.state.value}
                                             placeholder="Bir mesaj yaz"
                                             onChange={this.__handleChange.bind(this)}/>
                                <InputGroup.Button>
                                    <Button onClick={this.__sendMessage.bind(this)}>gonder</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Row>
                </div>
            </div>
        );
    }

    __handleChange(e) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    }

    __getChat(date) {
        //let date = "2017-07-07T21:04:05.224Z";
        axios.get('https://warm-dawn-46493.herokuapp.com/chat/history/?date=' + date)
            .then(function (response) {
                let itemArr = this.state.itemArr;
                response.data.map((res, idx) => {
                    if (idx == 4) this.state.date = res.date;
                    itemArr.push(
                        <ListGroupItem key={res.id}>
                            { res["username"] !== "system" ? (res["username"] + "-----" + res["text"]) : (res["text"] + "------" +
                                res["username"]) }
                        </ListGroupItem>);
                });
                this.setState({itemArr: itemArr});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            }.bind(this));
    }

    __sendMessage() {
        let message = {
            text: this.state.value,
            username: "serkan"
        };
        axios.post('https://warm-dawn-46493.herokuapp.com/chat/message', message)
            .then(function (response) {
                this.setState({itemArr: [], value: "", date: ""});
                this.__getChat("");
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            }.bind(this));
    }

    componentDidMount() {
        this.__getChat("");
    }
}