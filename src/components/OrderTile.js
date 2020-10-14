import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, Image, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';


class OrderTile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPressed: false,
            tabType: props.tabType,
            actionText: ""
        }
    }

    componentDidMount() {
        this.setState({ isPressed: false })
        this._handleTabClicked();
    }



    _handleTabClicked() {
        if (this.props.tabType === 'completed')
            this.setState({ actionText: "" })
        if (this.props.tabType === 'pending')
            this.setState({ actionText: "Order Picked up" })
        if (this.props.tabType === 'inProgress')
            this.setState({ actionText: "Delivery Completed" })
    }

    render() {
        let dropDown;
        if (this.state.isPressed) {
            if (this.props.tabType === 'pending' || this.props.tabType === 'inProgress') {
            dropDown =
                <View >
                    <View style={{ paddingHorizontal: 40, paddingTop: 20 }}>
                        <Text style={styles.ddTitle}>Sender's name</Text>
                        <Text style={styles.ddValue}>Ginika</Text>
                        <Text style={styles.ddTitle}>Sender's phone number</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.ddValue}>+234 708 525 4825</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Icon
                                    active
                                    name='call' size={25} color={'#0ED91B'}
                                    type='ionicons' iconStyle={{ paddingHorizontal: 10 }} />
                                <Icon
                                    active
                                    name='message' size={25} color={'#0ED91B'}
                                    type='material-icons' iconStyle={{ paddingHorizontal: 10 }} />
                            </View>
                        </View>
                        <Text style={styles.ddTitle}>Pickup address</Text>
                        <Text style={styles.ddValue}>18 Rumens road, Ikoyi, Lagos</Text>
                        <Text style={styles.ddTitle}>Description</Text>
                        <Text style={styles.ddValue}>Clothing</Text>
                    </View>
                    <View style={{ paddingHorizontal: 40, paddingTop: 10 }}>
                        <Text style={styles.ddTitle}>Receiver's name</Text>
                        <Text style={styles.ddValue}>Ginika</Text>
                        <Text style={styles.ddTitle}>Receiver's phone number</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.ddValue}>+234 708 525 4825</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Icon
                                    active
                                    name='call' size={25} color={'#0ED91B'}
                                    type='ionicons' iconStyle={{ paddingHorizontal: 10 }} />
                                <Icon
                                    active
                                    name='message' size={25} color={'#0ED91B'}
                                    type='material-icons' iconStyle={{ paddingHorizontal: 10 }} />
                            </View>
                        </View>
                        <Text style={styles.ddTitle}>Delivery address</Text>
                        <Text style={styles.ddValue}>3 Morinre Johnson, Lekki Phase 1, Lagos</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 30, paddingHorizontal: 40, backgroundColor: '#0ED91B', marginTop: 10, justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                active
                                name='double-arrow' size={25} color={'#FFF'}
                                type='material-icons' />
                        </View>
                        <Text style={{ fontSize: 20, color: '#FFF' }}>{this.state.actionText}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                active
                                name='double-arrow' size={25} color={'#FFF'}
                                type='material-icons' />
                        </View>
                    </View>
                </View>
            }
        }
        return (
            <View style={this.props.style}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => { this.setState({ isPressed: !this.state.isPressed }); this._handleTabClicked() }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 25 }}>Order #</Text>
                        <View style={styles.orderTab}>
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <Icon
                                    active
                                    name='dot-single' size={25} color={'#0ED91B'}
                                    type='entypo' />

                                <Icon
                                    active
                                    name='dot-single' size={25} color={'#707070'}
                                    type='entypo' />

                            </View>
                            <View style={{ flex: 3, }}>
                                <Text style={{ color: '#F72514', }}>Festac Town, Lagos</Text>
                                <Text>to</Text>
                                <Text style={{ color: '#F72514' }}>Idumota, Lagos</Text>
                            </View>
                            <View style={{ flex: 4, justifyContent: 'space-between' }}>
                                <Text>11 Mar 2020, 11:26:10</Text>
                                <Text>11 Mar 2020, 12:01:16</Text>
                            </View>
                            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>₦2000</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {dropDown}
                </View>
            </View>
        );
    }

}

export default OrderTile;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 3,
        paddingBottom: 10
    },
    orderTab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    ddTitle: {
        color: '#707070',
        fontSize: 12
    },
    ddValue: {
        color: '#000',
        fontSize: 16
    }

});