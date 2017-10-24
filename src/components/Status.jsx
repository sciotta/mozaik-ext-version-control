import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';

//export default React.createClass(

class Status extends Component {
    constructor(props) {
        super(props);

        this.state = { title: null, value: null };
    }

    getApiRequest() {
        return {
          id: `nagios.status.${this.props.hostName}`,
          params: {
            hostName: this.props.hostName
          }
        };
    }

    onApiData(data) {
        let serviceStatus = data.servicestatuslist.servicestatus[0];
        let displayName = serviceStatus.display_name;
        let status = serviceStatus.status_text;

        this.setState({
            title: displayName,
            value: status
        });
    }

    render() {
        var title = "unknown", value = "unknown";
        if (this.state.title){
            title = this.state.title;
        }
        if (this.state.value){
            value = this.state.value;
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">
                        {title}
                    </span>
                    <i className="fa fa-table" />
                </div>
                <div className="json__value">
                    <span>
                        {value} 
                    </span>
                </div>
            </div>
        );
    }
}

Status.displayName = 'Status';

reactMixin(Status.prototype, ListenerMixin);
reactMixin(Status.prototype, Mozaik.Mixin.ApiConsumer);

export default Status;
