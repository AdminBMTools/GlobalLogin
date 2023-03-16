<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TaskController extends Controller
{
    /*Task Methods*/
    public function getTask($id){
        $task = DB::table('tareas')->where('id_usuario', $id)->orderBy('creado', 'desc')->get();
        return response()->json($task);
    }

    public function getTaskByRol($rol){
        $task = DB::table('tareas')->where('rol', '>', $rol)->orderBy('creado', 'desc')->get();
        return response()->json($task);
    }

    public function getTaskAsigned($id){
        $task = DB::table('tareas')->where('asignacion', $id)->orderBy('creado', 'desc')->get();
        return response()->json($task);
    }

    public function postTask(Request $request){
        $data = $request->all();
        $id_user = $data['id_usuario'];
        $data['fecha_inicio'] = substr($data['fecha_inicio'], 6, 9)."-".$data['fecha_inicio'][3].$data['fecha_inicio'][4]."-".$data['fecha_inicio'][0].$data['fecha_inicio'][1];
        $data['fecha_compromiso'] = substr($data['fecha_compromiso'], 6, 9)."-".$data['fecha_compromiso'][3].$data['fecha_compromiso'][4]."-".$data['fecha_compromiso'][0].$data['fecha_compromiso'][1];
        $data = DB::table('tareas')->insert($data);

        //Push Notification
        $notify = DB::table('notificaciones')->insert(['id_usuario' => $id_user, 'message' => 'Nueva Tarea Creada']);

        return response()->json(["message" => "Success"], 201);
    }

    public function putTask(Request $request){
        $data = $request->all();
        $data['fecha_inicio'] = substr($data['fecha_inicio'], 6, 9)."-".$data['fecha_inicio'][3].$data['fecha_inicio'][4]."-".$data['fecha_inicio'][0].$data['fecha_inicio'][1];
        $data['fecha_compromiso'] = substr($data['fecha_compromiso'], 6, 9)."-".$data['fecha_compromiso'][3].$data['fecha_compromiso'][4]."-".$data['fecha_compromiso'][0].$data['fecha_compromiso'][1];
        $data = DB::table('tareas')->where('id', $data['id'])->update($data);
        return response()->json(["message" => "Success"], 201);
    }

    /*Users Methods*/
    public function getUserByRol($rol){
        $users = DB::table('users')->select('name', 'id', 'rol')->where('rol', '>', $rol)->get();
        return response()->json($users);
    }

    public function shareUser($id){
        $users = DB::table('users')->select('name', 'id', 'rol')->where('id', '!=', $id)->get();
        return response()->json($users);
    }

    public function postUser ( Request $request ) {
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        $data = DB::table('users')->insert($data);
        return response(["message" => "Success"], 201);
    }

    public function getTaskCount ( $id, $rol ) {
        $data = [];
        if($rol < 4 ){
            $data[0] = DB::table('tareas')->where('id_usuario', $id)->count();
            $data[1] = DB::table('tareas')->where('asignacion', $id)->count();
            $data[2] = DB::table('tareas')->where('rol', '>', $rol)->count();
        }
        $data[0] = DB::table('tareas')->where('id_usuario', $id)->count();
        return response()->json($data, 200);
    }

    /*Current Task Methods*/
    public function postCurrentTask ( Request $request ) {
        $data = $request->all();
        $result = DB::table('tareas_recurrentes')->insert($data);
        return response()->json(["message" => "Success"], 200);
    }

    /*Notifications*/
    public function getNotification ( $id ){
        $data = DB::table('notificaciones')->where('id_usuario', $id)->get();
        return response()->json($data, 200);
    }

    public function deleteNotification ( Request $request ){
        $data = $request->all();
        $deleted = DB::table('notificaciones')->where('id', $data['id'])->delete();
        return response()->json(["message" => 'success'], 200);
    }

    /*Test Mehods*/
    public function testUser () {
        // $users = DB::table('users')->get();
        // foreach ($users as $user) {
        //     $task = ["id_usuario" => $user->id, "rol" => $user->rol, "descripcion" => "Revisar Tareas Pendientes", 
        //     "progreso" => "No iniciada", "prioridad" => "Alta", "fecha_inicio" => date('Y-m-d'), "fecha_compromiso" => date('Y-m-d')];
        //     $data = DB::table('tareas')->insert($task);
        // }
        // $current_task = DB::table('tareas_recurrentes')->where('periodicidad', '!=', 'Semanal')->get();
        // return response()->json($current_task, 200);
        //return response()->json("Success", 200);
    }
}
