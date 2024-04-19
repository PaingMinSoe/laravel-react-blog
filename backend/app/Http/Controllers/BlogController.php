<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;

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
        ->when($request->has('categories'), function($query) use ($request) {
            return $query->whereHas('categories', function($query) use ($request) {
                return $query->whereIn('category_id', $request->input('categories'));
            });
        })
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
