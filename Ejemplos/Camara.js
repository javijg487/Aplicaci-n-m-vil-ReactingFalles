import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { View } from 'react-native';
export default function ExpoCameraDemo() {
    const [permission, requestPermission] = useCameraPermissions();
    // if (!permission) ...
    // if (!permission.granted) ...
    return (
        <View style={{ flex: 1 }}>
            <CameraView style={{ flex: 1 }}
                facing="back"
                barCodeScannerSettings={{
                    barCodeTypes: ["qr"],
                }}
                onBarcodeScanned={(data) => {
                    console.log(data);
                }}
            >
            </CameraView>
        </View>
    );
}