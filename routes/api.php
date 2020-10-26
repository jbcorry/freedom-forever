<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\LoanApp;
use App\Http\Controllers\LoanAppController;
use Illuminate\Support\Facades\URL;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

if (App::environment('production')) {
    URL::forceScheme('https');
}

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// CRUD Routes

Route::get('loan-apps', 'App\Http\Controllers\LoanAppController@index');
 
Route::get('loan-apps/{loanApp}', 'App\Http\Controllers\LoanAppController@show');
  
 
Route::post('loan-apps', 'App\Http\Controllers\LoanAppController@store');
 
Route::put('loan-apps/{loanApp}', 'App\Http\Controllers\LoanAppController@update');
 
Route::delete('loan-apps/{loanApp}', 'App\Http\Controllers\LoanAppController@delete');
