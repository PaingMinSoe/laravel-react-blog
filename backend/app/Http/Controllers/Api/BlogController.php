<?php

namespace App\Http\Controllers\Api;

use App\Models\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $blogs = Blog::when($request->has('limit'), function ($query) use ($request) {
            return $query->limit($request->input('limit'))->get();
        })
        // categories filter
        ->when($request->has('categories'), function($query) use ($request) {
            return $query->whereHas('categories', function($query) use ($request) {
                return $query->whereIn('category_id', $request->input('categories'));
            });
        })
        // search keyword filter
        ->when($request->has('search'), function ($query) use ($request) {
            return $query->where('title', 'like', '%' . $request->input('search') . '%')
                         ->orWhere('body', 'like', '%' . $request->input('search') . '%');
        })
        // limit for homepage
        ->when(!$request->has('limit'), function($query) {
            return $query->paginate(6)->withQueryString();
        });

        return BlogResource::collection($blogs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return new BlogResource($blog);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
