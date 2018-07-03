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
import java.util.List;

import javax.annotation.Nullable;
import android.util.Log;


import android.app.Activity;
import java.lang.Boolean;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.rncharts.data.DataExtract;
import com.rncharts.data.LineDataExtract;
import com.rncharts.listener.RNOnChartValueSelectedListener;
import com.rncharts.listener.RNOnChartGestureListener;
import com.rncharts.utils.ConversionUtil;

public class LineChartManager extends BarLineChartBaseManager<LineChart, Entry> {
    public static final int COMMAND_ADD_ENTRY = 1;
    public static final int COMMAND_UPDATE_ENTRY = 2;

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
            "updateEntry",COMMAND_UPDATE_ENTRY,
        );
    }

    @Override
    public void receiveCommand(LineChart lineChart, int commandType, @Nullable ReadableArray args ) {
        // ConversionUtil.toList(args);

        LineData lineData = lineChart.getData();
        ILineDataSet lineDataSet = lineData.getDataSetByIndex(args.getInt(0));

        switch (commandType) {
            case COMMAND_ADD_ENTRY:
                Log.d("ReactNativeJS", "receiveCommand: COMMAND_ADD_ENTRY");
                // lineDataSet.addEntry(new Entry(args.getInt(1), args.getInt(2)));
                lineData.notifyDataChanged(); // let the data know a dataSet changed
                lineChart.notifyDataSetChanged(); // let the chart know it's data changed
                lineChart.invalidate(); // refresh
                return;
            case COMMAND_UPDATE_ENTRY:
                lineDataSet.addEntry(new Entry(args.getInt(1), (float) args.getDouble(2)));
                lineDataSet.removeFirst();
                lineData.notifyDataChanged(); // let the data know a dataSet changed
                lineChart.notifyDataSetChanged(); // let the chart know it's data changed
                lineChart.invalidate(); // refresh
                return;
            default:
                return;
        }
    }
}
