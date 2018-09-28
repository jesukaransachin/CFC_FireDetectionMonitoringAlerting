package com.ibm.iot.android.iotstarter;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Path;
import retrofit2.http.QueryMap;

/**
 * Created by sachinjesukaran on 02/09/18.
 */

public interface GetDataService {
    @Headers("Authorization: Basic ZGYwMDkzOGMtYWU5NC00NzdjLWJjMzQtZDYxMDU4NmNlNzliOkpQM25lNUcwdjU=")
    @GET("/api/weather/v1/geocode/{lat}/{log}/observations.json?language=en-US&units=m\n")
    Call<WeatherData> getTemperature(@Path(value = "lat", encoded = true) String lat,@Path(value = "log", encoded = true) String log);
}
