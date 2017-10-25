import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';

//export default React.createClass(
const states = {
    '0': 'OK',
    '1': 'WARNING',
    '2': 'CRITICAL',
    '3': 'UNKNOWN'
}

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
        let mappedStatuses = []
        let title, status;
        let statusClasses = 'nagios__status ';

        data.servicestatuslist.servicestatus.forEach(function(serviceStatus) {
            title = serviceStatus.host_name;
            if(serviceStatus.current_state !== '0'){
                statusClasses += ` nagios__value--${states[serviceStatus.current_state]}`;
            }

            mappedStatuses.push({
                type: serviceStatus.display_name,
                state: states[serviceStatus.current_state],
                stateClass: ` nagios__value--${states[serviceStatus.current_state]}`,
                statusDescription: serviceStatus.status_text
            });
        });

        this.setState({
            mappedStatuses,
            title,
            statusClasses
        });
    }

    render() {
        var title = "unknown", value = "unknown";
        var mappedStatuses = [];
        var statusClasses = "";

        if (this.state.title){
            title = this.state.title;
        }

        if (this.state.mappedStatuses){
            mappedStatuses = this.state.mappedStatuses;
        }

        if (this.state.statusClasses){
            statusClasses = this.state.statusClasses;
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
                    {mappedStatuses.map(function(mappedStatus, i){
                        return <div>
                            <div className="nagios__status-details">
                                <div>{mappedStatus.type}</div>
                                <div className="nagios__status-small-text">
                                    {mappedStatus.statusDescription}
                                </div>
                            </div>
                            <div className="nagios__value">
                                <span className={mappedStatus.stateClass}>
                                    {mappedStatus.state}
                                </span>
                            </div>
                            <div className="nagios__clear"></div>
                        </div>;
                    })}
                    
                </div>
            </div>
        );
    }
}

Status.displayName = 'Status';

reactMixin(Status.prototype, ListenerMixin);
reactMixin(Status.prototype, Mozaik.Mixin.ApiConsumer);

export default Status;
