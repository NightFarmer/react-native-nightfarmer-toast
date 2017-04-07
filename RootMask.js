/**
 * Created by zhangfan on 17-4-7.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class RootMask extends Component {

    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
    }
});


export default RootMask