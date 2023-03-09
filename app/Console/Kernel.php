<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use Illuminate\Support\Facades\DB;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $users = DB::table('users')->get();
            foreach ($users as $user) {
                $task = ["id_usuario" => $user->id, "user_name" => $user->name, "rol" => $user->rol, "descripcion" => "Revisar Tareas Pendientes 2", 
                "progreso" => "No iniciada", "prioridad" => "Alta", "fecha_inicio" => date('Y-m-d'), "fecha_compromiso" => date('Y-m-d')];
                $data = DB::table('tareas')->insert($task);
            }
            $out = new \Symfony\Component\Console\Output\ConsoleOutput();
            $out->writeln('success');
        })->hourlyAt(32);
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
