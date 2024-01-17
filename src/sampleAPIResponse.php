<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SampleResponse extends Controller
{
    public function formFields() {
        return response()->json([
            /* [
                "id" => "one",
                "type" => "text",
                "value" => ""
            ], */
            [
                "id" => "brand",
                "type" => "select",
                "value" => "",
                "level" => 1,
                "options" => [
                    [
                        "value" => 1,
                        "key" => "maruti",
                        "label" => "Maruti",
                        "next" => "http://localhost/hrdb/public/api/model/maruti"
                    ],
                    [
                        "value" => 2,
                        "key" => "tata",
                        "label" => "Tata",
                    ],
                    [
                        "value" => 3,
                        "key" => "mahindra",
                        "label" => "Mahindra",
                    ]
                ]
            ],
        ]);
    } 
    public function model($brand) {
        return response()->json([
            /* [
                "id" => "option1 one",
                "type" => "text",
                "value" => ""
            ], */
            [
                "id" => "model",
                "type" => "select",
                "value" => "",
                "level" => 2,
                "options" => [
                    [
                        "value" => 1,
                        "label" => "Brezza",
                        "key" => "brezza",
                        "next" => "http://localhost/hrdb/public/api/variant/".$brand."/brezza"
                    ],
                    [
                        "value" => 2,
                        "label" => "Fronx",
                        "key" => "fronx"
                    ],
                    [
                        "value" => 3,
                        "label" => "Swift",
                        "key" => "swift"
                    ]
                ]
            ],
        ]);
    }

    public function variant($brand, $model) {
        return response()->json([
           /*  [
                "id" => "option2 one",
                "type" => "text",
                "value" => ""
            ], */
            [
                "id" => "variant",
                "type" => "select",
                "value" => "",
                "level" => 3,
                "options" => [
                    [
                        "value" => 1,
                        "label" => "LXi",
                        "next" => "http://localhost/hrdb/public/api/details/".$brand."/".$model."/lxi"
                    ],
                    [
                        "value" => 2,
                        "label" => "option2  two"
                    ],
                    [
                        "value" => 3,
                        "label" => "option2 three"
                    ]
                ]
            ],
        ]);
    }

    public function details($brand, $model, $variant) {
        return response()->json([
            [
                "id" => "details",
                "type" => "text",
                "value" => "Details"
            ],
            /* [
                "id" => "option3 two",
                "type" => "select",
                "value" => "",
                "options" => [
                    [
                        "value" => 1,
                        "label" => "option3 one",
                        "next" => "http://localhost/hrdb/public/api/option4"
                    ],
                    [
                        "value" => 2,
                        "label" => "option3  two"
                    ],
                    [
                        "value" => 3,
                        "label" => "option3 three"
                    ]
                ]
            ], */
        ]);
    }
}
