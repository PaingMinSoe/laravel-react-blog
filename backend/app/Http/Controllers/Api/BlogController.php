<?php

namespace App\Http\Controllers\Api;

use App\Models\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $blogs = Blog::when($request->has('limit'), function ($query) use ($request) {
            return $query->limit($request->input('limit'))->latest()->get();
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
        $data = $request->validate([
            'title' => 'required|string|unique:blogs,title',
            'body' => 'required|string',
            'categories' => 'required|array|min:1',
            'categories.*' => 'required|string',
            'blog_image' => 'nullable|image',
        ]);

        if ($request->has('blog_image')) {
            $filename = Carbon::now()->format('Y-m-d_H:i:s') . "_" . $request->file('blog_image')->getClientOriginalName();
            $request->file('blog_image')->move('blog_images/', $filename);
        }

        $blog = Blog::create([
            'title' => $data['title'],
            'body' => $data['body'],
            'user_id' => Auth::user()->id,
            'blog_image' => $filename,
        ]);
        $blog->categories()->attach($data['categories']);

        return response()->json([
            'message' => 'Blog Created Successfully!'
        ]);
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
    public function update(Request $request, Blog $blog)
    {
        $data = $request->validate([
            'title' => 'required|string|unique:blogs,title,' . $blog->id,
            'body' => 'required|string',
            'categories.*' => 'string',
        ]);

        $blog->update($data);

        return response()->json([
            'message' => 'Blog Updated Successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();

        return response()->json([
            'message' => 'Blog Deleted Successfully!'
        ]);
    }
}
