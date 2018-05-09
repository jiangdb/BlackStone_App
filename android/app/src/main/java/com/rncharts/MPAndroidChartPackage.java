package com.rncharts;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.rncharts.charts.BarChartManager;
import com.rncharts.charts.BubbleChartManager;
import com.rncharts.charts.CandleStickChartManager;
import com.rncharts.charts.CombinedChartManager;
import com.rncharts.charts.HorizontalBarChartManager;
import com.rncharts.charts.LineChartManager;
import com.rncharts.charts.PieChartManager;
import com.rncharts.charts.RadarChartManager;
import com.rncharts.charts.ScatterChartManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MPAndroidChartPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.asList();
    }

    // Deprecated in RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new BarChartManager(),
                new HorizontalBarChartManager(),
                new BubbleChartManager(),
                new CandleStickChartManager(),
                new LineChartManager(),
                new PieChartManager(),
                new RadarChartManager(),
                new ScatterChartManager(),
                new CombinedChartManager()
        );
    }

}
