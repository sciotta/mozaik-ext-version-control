import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class Versions extends Component {
    constructor(props) {
        super(props);

        this.state = { title: null };
    }

    getApiRequest() {
        var x = Math.floor((Math.random() * 1000) + 1);
        return {
          id: `versions.allVersions.${x}`,
          params: {
            frontend: this.props.frontend,
            backend: this.props.backend
          }
        };
    }

    onApiData(data) {
        console.log(JSON.stringify(data));

        let frontendVersion = data[0].version;
        let backendVersion = data[1].version;

        this.setState({
            frontendVersion,
            backendVersion
        });
    }

    render() {
        var title = "unknown", value = "unknown";
        var frontendVersion = [];
        var backendVersion = "";

        if (this.props.title){
            title = this.props.title;
        }

        if (this.state.frontendVersion){
            frontendVersion = this.state.frontendVersion;
        }

        if (this.state.backendVersion){
            backendVersion = this.state.backendVersion;
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">
                        {title}
                    </span>
                    <i className="fa fa-tasks" />
                </div>
                <div className="versions__content">
                    <div className="versions__description">WebAPP:</div>
                    <div className="versions__value">{frontendVersion}</div>
                    <div className="versions__description">CORE:</div>
                    <div className="versions__value">{backendVersion}</div>
                </div>
            </div>
        );
    }
}

Versions.displayName = 'Status';

reactMixin(Versions.prototype, ListenerMixin);
reactMixin(Versions.prototype, Mozaik.Mixin.ApiConsumer);

export default Versions;
