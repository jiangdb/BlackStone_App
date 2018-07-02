package com.rncharts.charts;


import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import java.util.Map;

import javax.annotation.Nullable;
import android.util.Log;


import android.app.Activity;
import java.lang.Boolean;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.rncharts.data.DataExtract;
import com.rncharts.data.LineDataExtract;
import com.rncharts.listener.RNOnChartValueSelectedListener;
import com.rncharts.listener.RNOnChartGestureListener;

public class LineChartManager extends BarLineChartBaseManager<LineChart, Entry> {
    public static final int COMMAND_ADD_ENTRY = 1;
    public static final int COMMAND_REMOVE_ENTRY = 2;
    public static final int COMMAND_REFRESH = 3;

    @Override
    public String getName() {
        return "RNLineChart";
    }

    @Override
    protected LineChart createViewInstance(ThemedReactContext reactContext) {
        LineChart lineChart =  new LineChart(reactContext);
        lineChart.setOnChartValueSelectedListener(new RNOnChartValueSelectedListener(lineChart));
        lineChart.setOnChartGestureListener(new RNOnChartGestureListener(lineChart));
        return lineChart;
    }

    @Override
    DataExtract getDataExtract() {
        return new LineDataExtract();
    }

    @Override
    public Map<String,Integer> getCommandsMap() {
        Log.d("ReactNativeJS"," View manager getCommandsMap:");
        return MapBuilder.of(
            "addEntry",COMMAND_ADD_ENTRY,
            "removeEntry",COMMAND_REMOVE_ENTRY,
            "refresh",COMMAND_REFRESH
        );
    }

    @Override
    public void receiveCommand(LineChart lineChart, int commandType, @Nullable ReadableArray args ) {
        LineData lineData = lineChart.getData();
        LineDataSet lineDataSet = lineData.getDataSetByLabel("Total");

        switch (commandType) {
            case COMMAND_ADD_ENTRY:
                Log.d("ReactNativeJS", "receiveCommand: COMMAND_ADD_ENTRY");
                entry = new Entry(x, y);
                lineDataSet.addEntry(entry);
                return;
            case COMMAND_REMOVE_ENTRY:
                Log.d("ReactNativeJS", "receiveCommand: COMMAND_REMOVE_ENTRY");
                lineDataSet.removeFirst();
                return;
            case COMMAND_REFRESH:
                lineData.notifyDataChanged(); // let the data know a dataSet changed
                lineChart.notifyDataSetChanged(); // let the chart know it's data changed
                lineChart.invalidate(); // refresh
                return;
            default:
                return;
        }
    }
}
