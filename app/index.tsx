import React, { useMemo, useRef } from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import {useDeviceProfile} from "@/src/hooks/useDeviceProfile";
import {loginHtml} from "@/src/webview/loginHtml";
import {desktopHtml} from "@/src/webview/desktopHtml";

export default function Home() {
    const webViewRef = useRef<WebView | null>(null);
    const { isDesktop } = useDeviceProfile();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#0f172a',
        },
        headerDesktop: {
            height: 56,
            backgroundColor: '#2563eb',
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerMobile: {
            height: 56,
            backgroundColor: '#2563eb',
            marginTop: 35,
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: '700',
        },
        webview: {
            flex: 1,
        },
        loadingState: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
        },
    });
    const iframeStyles = useMemo<React.CSSProperties>(() => ({
        border: 'none',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    }), []);
    return (
        <View style={styles.container}>
            {isDesktop ? (
                <>
                    <View className="flex-1 bg-gray-100">
                        <View className="h-14 bg-blue-600 items-center justify-center">
                            <Text className="text-white text-lg font-bold">
                                My WebView App
                            </Text>
                        </View>
                    </View>
                    <View style={styles.webview}>
                        <iframe
                            title="embedded-desktop-html"
                            srcDoc={desktopHtml}
                            style={iframeStyles}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.headerMobile}>
                        <Text style={styles.headerText}>My WebView App</Text>
                    </View>
                    <WebView
                        ref={webViewRef}
                        originWhitelist={['*']}
                        source={{ html: loginHtml, baseUrl: '' }}
                        javaScriptEnabled
                        style={styles.webview}
                        startInLoadingState
                        renderLoading={() => (
                            <View style={styles.loadingState}>
                                <ActivityIndicator size="large" />
                            </View>
                        )}
                        setSupportMultipleWindows={false}
                        automaticallyAdjustContentInsets={false}
                    />
                </>

            )}
        </View>
    );
}
