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
        return {
          id: `nagios.versions.${this.props.environment}`,
          params: {
            frontend: this.props.frontend,
            backend: this.props.backend
          }
        };
    }

    onApiData(data) {
        let title = 'Titulo';

        let frontendVersion = data[0];
        let backendVersion = data[1];

        this.setState({
            frontendVersion,
            backendVersion,
            title
        });
    }

    render() {
        var title = "unknown", value = "unknown";
        var frontendVersion = [];
        var backendVersion = "";

        if (this.state.title){
            title = this.state.title;
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
                    <i className="fa fa-table" />
                </div>
                <div className="nagios__content">
                    <div>Front-end: {frontendVersion}</div>
                    <div>Back-end: {backendVersion}</div>
                </div>
            </div>
        );
    }
}

Versions.displayName = 'Status';

reactMixin(Versions.prototype, ListenerMixin);
reactMixin(Versions.prototype, Mozaik.Mixin.ApiConsumer);

export default Versions;
