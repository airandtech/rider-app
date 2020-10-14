
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import OrderTile from '../../components/OrderTile';

export default class DeliveriesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "completed",
            completedOrders: [
                "", "",
            ],
            ordersInPorgress: [
                "", "", ""
            ],
            pendingOrders: [
                "",
            ],
            orderList: [],
            completed: { borderBottomColor: 'red' },
            inProgress: { borderBottomColor: 'transparent' },
            pending: { borderBottomColor: 'transparent' }
        }
    }

    _handleTabClick(type) {

        this.setState({ tab: type })
        if (type === 'completed') {
            this.setState({
                completed: { borderBottomColor: 'red' }, inProgress: { borderBottomColor: 'transparent' }, pending: { borderBottomColor: 'transparent' },
                orderList: ["", ""]
            })
        }
        if (type === 'inProgress') {
            this.setState({
                completed: { borderBottomColor: 'transparent' }, inProgress: { borderBottomColor: 'red' }, pending: { borderBottomColor: 'transparent' },
                orderList: ["", "", ""]
            })
        }
        if (type === 'pending') {
            this.setState({
                completed: { borderBottomColor: 'transparent' }, inProgress: { borderBottomColor: 'transparent' }, pending: { borderBottomColor: 'red' },
                orderList: [""]
            })
        }
    }

    render() {
        let body
        if (this.state.tab === 'completed') {
            body = <View>
                <FlatList
                    style={{ paddingBottom: 5 }}
                    data={this.state.completedOrders}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 2, }}>
                            <OrderTile tabType={this.state.tab} />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        }
        if (this.state.tab === 'inProgress') {
            body = <View>
                <FlatList
                    style={{ paddingBottom: 5 }}
                    data={this.state.ordersInPorgress}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 2, }}>
                            <OrderTile tabType={this.state.tab} />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        }
        if (this.state.tab === 'pending') {
            body = <View>
                <FlatList
                    style={{ paddingBottom: 5 }}
                    data={this.state.pendingOrders}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 2, }}>
                            <OrderTile tabType={this.state.tab} />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={[{ borderBottomWidth: 4, paddingVertical: 20, paddingHorizontal: 20 }, this.state.completed]} onPress={() => this._handleTabClick('completed')}><Text style={styles.headerText}>Completed</Text></TouchableOpacity>
                    <TouchableOpacity style={[{ borderBottomWidth: 4, paddingVertical: 20, paddingHorizontal: 20 }, this.state.inProgress]} onPress={() => this._handleTabClick('inProgress')}><Text style={styles.headerText}>In Progress</Text></TouchableOpacity>
                    <TouchableOpacity style={[{ borderBottomWidth: 4, paddingVertical: 20, paddingHorizontal: 20 }, this.state.pending]} onPress={() => this._handleTabClick('pending')}><Text style={styles.headerText}>Pending</Text></TouchableOpacity>
                </View>
                {body}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#FFF'
    },
    title: {
        fontSize: 35, textTransform: "uppercase", marginTop: 10
    },
    header: {
        backgroundColor: '#2AA1B5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        color: '#FFF',
        fontWeight: "bold",
        fontSize: 18
    }
}); 
