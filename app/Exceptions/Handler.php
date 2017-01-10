<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
        ModelNotFoundException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param \Exception $e
     */
    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Exception               $e
     *
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        // Handles JWT exceptions
        if ($e instanceof Tymon\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json([
              'token_expired'
            ], $e->getStatusCode());
        }
        elseif ($e instanceof Tymon\JWTAuth\Exceptions\TokenInvalidException) {
            return response()->json([
              'token_invalid'
            ], $e->getStatusCode());
        }
        elseif ($e instanceof Tymon\JWTAuth\Exceptions\JWTException) {
            return response()->json([
              'token_absent'
            ], $e->getStatusCode());
        }

        // Handles Object not found for api page
        if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            return response()->Json([
              'message' => 'Record not found',
            ], 404);
        }
        if ($e instanceof \Symfony\Component\HttpKernel\Exception\ModelNotFoundException) {
            return response()->Json([
              'message' => 'Record not found',
            ], 404);
        }
        return parent::render($request, $e);
    }
}
