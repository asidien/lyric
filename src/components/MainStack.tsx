import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./screens/HomeScreen";
import { EditorScreen } from "./screens/EditorScreen";
import { PerformanceScreen } from "./screens/PerformanceScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1F2937",
                },
                headerTintColor: "#fff",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "My Songs" }}
            />
            <StackNavigator.Screen
                name="Editor"
                component={EditorScreen}
                options={{ title: "Edit Song" }}
            />
            <StackNavigator.Screen
                name="Performance"
                component={PerformanceScreen}
                options={{ title: "Performance Mode" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);