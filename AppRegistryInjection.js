import React, {Component} from 'react';
import {StyleSheet, View, AppRegistry} from 'react-native';
import StaticContainer from 'react-native/Libraries/Components/StaticContainer';
// import EventEmitter from 'react-native/Libraries/EventEmitter/EventEmitter';

import RootMask from './RootMask'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    }
});

const handler = {};

const originRegister = AppRegistry.registerComponent;

AppRegistry.registerComponent = function (appKey, getAppComponent) {

    return originRegister(appKey, function () {
        const OriginAppComponent = getAppComponent();

        return class extends Component {

            state = {
                actView: null
            };

            callQueue = [];

            componentWillMount() {
                handler.show = this.show;
            };

            show = (it) => {
                if (this.state.actView) {
                    this.callQueue.push(it);
                    return
                }
                this._pushView(it);
                return it;
            };

            _pushView = (it) => {
                it.dismissCallback = () => {
                    if (this.callQueue.length > 0) {
                        let item = this.callQueue.shift();
                        this._pushView(item)
                    } else {
                        this.setState({actView: null})
                    }
                };
                this.setState({actView: it});
            };


            dismiss = (it) => {
                it.compRef.dismiss()
            };

            render() {
                return (
                    <View style={styles.container}>
                        <StaticContainer shouldUpdate={false}>
                            <OriginAppComponent {...this.props} />
                        </StaticContainer>
                        {
                            this.state.actView ?
                                <RootMask>
                                    {this.state.actView.component}
                                </RootMask>
                                : null
                        }
                    </View>
                );
            };
        };
    });
};

let emitter = 1;
export default handler;
