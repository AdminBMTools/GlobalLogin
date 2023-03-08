<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/get/task/{id}', 'App\Http\Controllers\TaskController@getTask');
Route::post('/post/task', 'App\Http\Controllers\TaskController@postTask');
Route::post('/put/task', 'App\Http\Controllers\TaskController@putTask');
Route::get('/get/user/{rol}', 'App\Http\Controllers\TaskController@getUserByRol');
Route::get('/get/shareuser/{id}', 'App\Http\Controllers\TaskController@shareUser');

Route::post('/post/user', 'App\Http\Controllers\TaskController@postUser');