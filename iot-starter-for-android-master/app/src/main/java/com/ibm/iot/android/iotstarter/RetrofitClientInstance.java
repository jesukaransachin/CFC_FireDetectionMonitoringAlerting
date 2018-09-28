package com.ibm.iot.android.iotstarter;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by sachinjesukaran on 02/09/18.
 */

public class RetrofitClientInstance {
    private static Retrofit retrofit;
    private static final String BASE_URL = "https://twcservice.eu-gb.mybluemix.net";

    public static Retrofit getRetrofitInstance() {
        if (retrofit == null) {
            retrofit = new retrofit2.Retrofit.Builder()
                    .baseUrl(BASE_URL)

                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}
