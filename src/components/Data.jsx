import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';

//export default React.createClass(

class Data extends Component {
    constructor(props) {
        super(props);

        this.state = { title: null, value: null };
    }

    getInitialState() {
        return {
            title: null,
            value: null
        };
    }

    getApiRequest() {
        return {
          id: 'nagios.serviceStatus',
          params: {
            hostName: this.props.hostName
          }
        };
    }

    onApiData(data) {
        const serviceStatus = data.servicestatuslist.servicestatus[0];
        const displayName = serviceStatus.display_name;
        const status = serviceStatus.status_text;

        this.setState({
            title: displayName,
            value: status
        });
    }

    render() {
        var title = "unknown", value = "unknown", unit = null;
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

Data.displayName = 'ServiceStatus';

Data.propTypes = {
    title: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
};

Data.defaultProps = {
    title: 'Mozaïk Nagios widget',
    value: 'empty'
};

reactMixin(Data.prototype, ListenerMixin);
reactMixin(Data.prototype, Mozaik.Mixin.ApiConsumer);

export { Data as default };
