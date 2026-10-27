<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            // The tag as it is written, already normalized: lower case, words joined by dashes.
            $table->string('name', 24)->unique();
            $table->timestamps();
        });
    }
};
