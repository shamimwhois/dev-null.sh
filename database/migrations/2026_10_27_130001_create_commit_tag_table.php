<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commit_tag', function (Blueprint $table): void {
            $table->foreignUuid('commit_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('tag_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->primary(['commit_id', 'tag_id']);
            // A tag page lists the commits behind it, and the primary key starts at the commit.
            $table->index('tag_id');
        });
    }
};
