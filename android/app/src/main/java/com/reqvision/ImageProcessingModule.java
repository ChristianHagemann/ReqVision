package main.java.com.reqvision;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.nfc.Tag;
import android.os.Environment;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.Random;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class ImageProcessingModule extends ReactContextBaseJavaModule {

    public ImageProcessingModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "ImageProcessing";
    }

    /**
     * create greyscale of image by given path and return new path
     * TODO do greyscale in own method
     * @param imagePath
     * @param errorCallback
     * @param successCallback
     */
    @ReactMethod
    public void greyScaleImage(String imagePath, Callback errorCallback, Callback successCallback) {
        try {
            successCallback.invoke(imagePath);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    /**
     * execute pre-processing algorithm for the image to improve results
     * @param imagePath path to image on phone
     * @param errorCallback callback for error
     * @param successCallback callback for success
     */
    @ReactMethod
    public void preprocessImage(String imagePath, Callback errorCallback, Callback successCallback) {
        // TODO add pre-processing algorithm
    }
}
