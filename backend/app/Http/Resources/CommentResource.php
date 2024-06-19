<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user' => [
                'name' => $this->user->name,
                'profile_image' => $this->user->profile_image ? asset('profile_images/' . $this->user->profile_image) : null
            ],
            'body' => $this->body,
            'parent_id' => $this->parent_id,
            'created_at' => $this->created_at->format('jS F Y'),
        ];
    }
}
