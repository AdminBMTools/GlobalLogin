<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TaskController extends Controller
{
    public function getTask($id){
        $task = DB::table('tareas')->where('id_usuario', $id)->get();
        return response()->json($task);
    }

    public function postTask(Request $request){
        $data = $request->all();
        $data['fecha_inicio'] = substr($data['fecha_inicio'], 6, 9)."-".$data['fecha_inicio'][3].$data['fecha_inicio'][4]."-".$data['fecha_inicio'][0].$data['fecha_inicio'][1];
        $data['fecha_compromiso'] = substr($data['fecha_compromiso'], 6, 9)."-".$data['fecha_compromiso'][3].$data['fecha_compromiso'][4]."-".$data['fecha_compromiso'][0].$data['fecha_compromiso'][1];
        $data = DB::table('tareas')->insert($data);
        return response()->json(["message" => "Success"], 201);
    }

    public function putTask(Request $request){
        $data = $request->all();
        $data['fecha_inicio'] = substr($data['fecha_inicio'], 6, 9)."-".$data['fecha_inicio'][3].$data['fecha_inicio'][4]."-".$data['fecha_inicio'][0].$data['fecha_inicio'][1];
        $data['fecha_compromiso'] = substr($data['fecha_compromiso'], 6, 9)."-".$data['fecha_compromiso'][3].$data['fecha_compromiso'][4]."-".$data['fecha_compromiso'][0].$data['fecha_compromiso'][1];
        $data = DB::table('tareas')->where('id', $data['id'])->update($data);
        return response()->json(["message" => "Success"], 201);
    }

    public function getUserByRol($rol){
        $users = DB::table('users')->select('name', 'id')->where('rol', '>', $rol)->get();
        return response()->json($users);
    }

    public function getUser(){
        $users = DB::table('users')->select('name', 'id')->get();
        return response()->json($users);
    }

    public function postUser ( Request $request ) {
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        $data = DB::table('users')->insert($data);
        return response(["message" => "Success"], 201);
    }
}
