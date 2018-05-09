package com.rncharts.charts;


import com.facebook.react.uimanager.ThemedReactContext;
import com.github.mikephil.charting.charts.BubbleChart;
import com.github.mikephil.charting.data.BubbleEntry;
import com.rncharts.data.BubbleDataExtract;
import com.rncharts.data.DataExtract;
import com.rncharts.listener.RNOnChartGestureListener;
import com.rncharts.listener.RNOnChartValueSelectedListener;

public class BubbleChartManager extends BarLineChartBaseManager<BubbleChart, BubbleEntry> {

    @Override
    public String getName() {
        return "RNBubbleChart";
    }

    @Override
    protected BubbleChart createViewInstance(ThemedReactContext reactContext) {
        BubbleChart bubbleChart =  new BubbleChart(reactContext);
        bubbleChart.setOnChartValueSelectedListener(new RNOnChartValueSelectedListener(bubbleChart));
        bubbleChart.setOnChartGestureListener(new RNOnChartGestureListener(bubbleChart));
        return bubbleChart;
    }


    @Override
    DataExtract getDataExtract() {
        return new BubbleDataExtract();
    }
}
