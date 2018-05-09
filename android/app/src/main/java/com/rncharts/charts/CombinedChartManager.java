package com.rncharts.charts;


import com.facebook.react.uimanager.ThemedReactContext;
import com.github.mikephil.charting.charts.CombinedChart;
import com.github.mikephil.charting.data.Entry;
import com.rncharts.data.CombinedDataExtract;
import com.rncharts.data.DataExtract;
import com.rncharts.listener.RNOnChartGestureListener;
import com.rncharts.listener.RNOnChartValueSelectedListener;

public class CombinedChartManager extends BarLineChartBaseManager<CombinedChart, Entry> {

    @Override
    public String getName() {
        return "RNCombinedChart";
    }

    @Override
    protected CombinedChart createViewInstance(ThemedReactContext reactContext) {
        CombinedChart combinedChart = new CombinedChart(reactContext);
        combinedChart.setOnChartValueSelectedListener(new RNOnChartValueSelectedListener(combinedChart));
        combinedChart.setOnChartGestureListener(new RNOnChartGestureListener(combinedChart));
        return combinedChart;
    }

    @Override
    DataExtract getDataExtract() {
        return new CombinedDataExtract();
    }
}
