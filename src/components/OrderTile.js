import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { baseUrl, formatDate, getToken, processResponse, showTopNotification, token } from '../utilities';
import RNSwipeVerify from 'react-native-swipe-verify';

const { width } = Dimensions.get('window');

class OrderTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPressed: false,
            tabType: props.tabType,
            actionText: '',
            actionedText: '',
            isUnlocked: false,
            isUploaded: false,
            status:''
        };
    }

    componentDidMount() {
        this.setState({ isPressed: false });
        this._handleTabClicked();

        // setInterval(() => {
        //     showTopNotification("danger", "Orders Updated!!!")
        //     this.props.navigation.navigate('IncomingOrderX')
        // }, 500);
    }

    _handleTabClicked() {
        if (this.props.tabType === 'completed') this.setState({ actionText: '' });
        if (this.props.tabType === 'pending')
            this.setState({ actionText: 'Pick Up Order', actionedText: 'Order Picked up', status: 'InProgress' });
        if (this.props.tabType === 'inProgress')
            this.setState({ actionText: 'Complete Delivery', actionedText: 'Delivery Completed', status: 'Completed' });
    }

    doAction = async () => {
        fetch(baseUrl() + 'api/dispatch/orders/status/change', {
            method: 'post',
            headers: {
                "Authorization": await getToken(),
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ 'orderId': `${this.props.dataItem.id}`, 'status': this.state.status })
        }).then(processResponse)
            .then(res => {
                console.warn(`request ==> ${JSON.stringify({ 'orderId': this.props.dataItem.id, 'status': this.state.status })}`)
                if (res.statusCode === 200 && res.data.status) {
                    console.warn(`data==> ${JSON.stringify(res.data.data)}`)
                    this.props.parentOrderAction()
                } else {
                    this.props.navigation.navigate('AppNavigator')
                    this.setState({ loading: false })
                    showTopNotification("danger", res.data.message)
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                showTopNotification("danger", error.message)
            });
            
    }

    render() {
        const { isUnlocked, isUploaded } = this.state
        let dropDown;
        if (this.state.isPressed) {
            if (
                this.props.tabType === 'pending' ||
                this.props.tabType === 'inProgress'
            ) {
                dropDown = (
                    <View>
                        <View style={{ paddingHorizontal: 40, paddingTop: 20 }}>
                            <Text style={styles.ddTitle}>Sender's name</Text>
                            <Text style={styles.ddValue}>
                                {this.props.dataItem.pickUp.name}
                            </Text>
                            <Text style={styles.ddTitle}>Sender's phone number</Text>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.ddValue}>
                                    {this.props.dataItem.pickUp.phone}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                    <Icon
                                        active
                                        name="call"
                                        size={25}
                                        color={'#0ED91B'}
                                        type="ionicons"
                                        iconStyle={{ paddingHorizontal: 10 }}
                                    />
                                    <Icon
                                        active
                                        name="message"
                                        size={25}
                                        color={'#0ED91B'}
                                        type="material-icons"
                                        iconStyle={{ paddingHorizontal: 10 }}
                                    />
                                </View>
                            </View>
                            <Text style={styles.ddTitle}>Pickup address</Text>
                            <Text style={styles.ddValue}>
                                {this.props.dataItem.pickUp.address}
                            </Text>
                            <Text style={styles.ddTitle}>Description</Text>
                            <Text style={styles.ddValue}>
                                {this.props.dataItem.delivery.description}
                            </Text>
                        </View>
                        <View style={{ paddingHorizontal: 40, paddingTop: 10 }}>
                            <Text style={styles.ddTitle}>Receiver's name</Text>
                            <Text style={styles.ddValue}>
                                {this.props.dataItem.delivery.name}
                            </Text>
                            <Text style={styles.ddTitle}>Receiver's phone number</Text>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.ddValue}>
                                    {this.props.dataItem.delivery.phone}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                    <Icon
                                        active
                                        name="call"
                                        size={25}
                                        color={'#0ED91B'}
                                        type="ionicons"
                                        iconStyle={{ paddingHorizontal: 10 }}
                                    />
                                    <Icon
                                        active
                                        name="message"
                                        size={25}
                                        color={'#0ED91B'}
                                        type="material-icons"
                                        iconStyle={{ paddingHorizontal: 10 }}
                                    />
                                </View>
                            </View>
                            <Text style={styles.ddTitle}>Delivery address</Text>
                            <Text style={styles.ddValue}>
                                {this.props.dataItem.delivery.address}
                            </Text>
                        </View>
                        <View style={styles.sliderButton}>
                        <RNSwipeVerify
                            ref={(ref) => (this.swipeVerify2 = ref)}
                            width={width - 50}
                            buttonSize={60}
                            buttonColor="#0ED91B"
                            backgroundColor="#0ED91B"
                            textColor="#FFF"
                            borderRadius={0}
                            okButton={{ visible: true, duration: 400 }}
                            onVerified={() => {
                                this.setState({ isUploaded: true });
                                this.doAction();
                            }}
                            icon={
                                isUnlocked ? <View ><Icon name='double-arrow' size={25} color={'#FFF'} type='material-icons' /></View> :  <View ><Icon name='double-arrow' size={25} color={'#FFF'} type='material-icons' /></View>

                            }
                        >
                            <Text style={{color: '#FFF', fontSize: 18}}>{isUploaded ? this.state.actionedText : this.state.actionText}</Text>
                        </RNSwipeVerify>
                        </View>
                    </View>
                );
            }
        }
        return (
            <View style={this.props.style}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 10 }}
                        onPress={() => {
                            this.setState({ isPressed: !this.state.isPressed });
                            this._handleTabClicked();
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 25 }}>
                            Order {this.props.dataItem.id}
                        </Text>
                        <View style={styles.orderTab}>
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <Icon
                                    active
                                    name="dot-single"
                                    size={25}
                                    color={'#0ED91B'}
                                    type="entypo"
                                />

                                <Icon
                                    active
                                    name="dot-single"
                                    size={25}
                                    color={'#707070'}
                                    type="entypo"
                                />
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={{ color: '#F72514' }}>
                                    {this.props.dataItem.pickUp.address}
                                </Text>
                                <Text>to</Text>
                                <Text style={{ color: '#F72514' }}>
                                    {this.props.dataItem.delivery.address}
                                </Text>
                            </View>
                            <View style={{ flex: 4, justifyContent: 'space-between' }}>
                                <Text>{formatDate(this.props.dataItem.dateCreated)}</Text>
                                <Text>{formatDate(this.props.dataItem.dateCreated)}</Text>
                            </View>
                            <View
                                style={{
                                    flex: 3,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text>₦{this.props.dataItem.cost}</Text>
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
        paddingBottom: 10,
    },
    orderTab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    ddTitle: {
        color: '#707070',
        fontSize: 12,
    },
    ddValue: {
        color: '#000',
        fontSize: 16,
    },
    sliderButton:{
       marginBottom: 55
    }
});
