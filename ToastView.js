/**
 * Created by zhangfan on 17-4-7.
 */
import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    View,
    Easing,
    Dimensions,
    Text,
    Animated
} from 'react-native';

const {width, height} = Dimensions.get("window");
const viewHeight = 35;
class ToastView extends Component {

    bottomAnim = new Animated.Value(height / 12);
    opacityAnim = new Animated.Value(0);

    render() {
        return (
            <Animated.Text style={[styles.defaultText,this.buildStyle()]}>{this.props.info.message}</Animated.Text>
        )
    }


    buildStyle = () => {
        // return {
        //     bottom: height / 2 - viewHeight / 2
        // }
        return {
            bottom: this.bottomAnim,
            opacity: this.opacityAnim
        }
    };

    componentDidMount() {
        Animated.timing(
            this.bottomAnim,
            {
                toValue: height / 8,
                duration: 250,
                easing: (t) => {
                    t -= 1.0;
                    return t * t * ((2 + 1) * t + 2) + 1.0;
                }
            },
        ).start(this.timingDismiss);
        Animated.timing(
            this.opacityAnim,
            {
                toValue: 1,
                duration: 100,
                easing: Easing.linear
            },
        ).start();
    }

    timingDismiss = () => {
        setTimeout(() => {
            this.dismiss()
        }, 1500)
    };

    dismiss = () => {
        Animated.timing(
            this.opacityAnim,
            {
                toValue: 0,
                duration: 100,
                easing: Easing.linear
            },
        ).start(this.onDismiss);
    };

    onDismiss = () => {
        if (this.props.onDismiss) {
            this.props.onDismiss()
        }
    }
}

const styles = StyleSheet.create({
    defaultText: {
        backgroundColor: "#000A",
        borderRadius: 8,
        color: "#FFF",
        fontSize: 11,
        alignSelf: "flex-end",
        padding: 10,
        maxWidth: width / 2
    }
});
export default ToastView