<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoanApp;

class LoanAppController extends Controller
{
    public function index() {
        return LoanApp::all();
    }

    public function show(LoanApp $loanApp) {
        return $loanApp;
    }

    public function store(Request $request) {
        $loanApp = LoanApp::create($request->all());
        return response()->json($loanApp, 201);
    }

    public function update(Request $request, LoanApp $loanApp) {
        $loanApp->update($request->all());

        return response()->json($loanApp, 200);
    }

    public function delete(LoanApp $loanApp) {
        $loanApp->delete();
        return resonse()-json(null, 204);
    }
}
