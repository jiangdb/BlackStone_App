package com.rncharts.charts;


import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
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
    public static final int COMMAND_REFRESH = 3;
    public static final int COMMAND_REMOVE_DATASET = 4;

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
            "refresh",COMMAND_REFRESH,
            "removeDataset",COMMAND_REMOVE_DATASET
        );
    }

    Entry createEntry(ReadableArray values, int index) {
        float x = index;

        Entry entry;
        if (ReadableType.Map.equals(values.getType(index))) {
            ReadableMap map = values.getMap(index);
            if (map.hasKey("x")) {
                x = (float) map.getDouble("x");
            }
            entry = new Entry(x, (float) map.getDouble("y"), ConversionUtil.toMap(map));
        } else if (ReadableType.Number.equals(values.getType(index))) {
            entry = new Entry(x, (float) values.getDouble(index));
        } else {
            throw new IllegalArgumentException("Unexpected entry type: " + values.getType(index));
        }

        return entry;
    }

    @Override
    public void receiveCommand(LineChart lineChart, int commandType, @Nullable ReadableArray args ) {

        LineData lineData = lineChart.getData();

        switch (commandType) {
            case COMMAND_ADD_ENTRY:
                lineData.addEntry(createEntry(args, 1),args.getInt(0));
                return;
            case COMMAND_UPDATE_ENTRY:
                lineData.addEntry(createEntry(args, 1),args.getInt(0));
                lineData.removeEntry(0,args.getInt(0));
                return;
            case COMMAND_REFRESH:
                Log.d("ReactNativeJS", "receiveCommand: COMMAND_REFRESH");

                lineData.notifyDataChanged(); // let the data know a dataSet changed
                lineChart.notifyDataSetChanged(); // let the chart know it's data changed
                lineChart.invalidate(); // refresh
                return;
            case COMMAND_REMOVE_DATASET:
                lineData.removeDataSet(args.getInt(0));
                lineChart.notifyDataSetChanged(); // let the chart know it's data changed
                lineChart.invalidate(); // refresh
                return;
            default:
                return;
        }
    }
}
