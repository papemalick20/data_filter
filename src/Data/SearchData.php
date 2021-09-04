<?php
 namespace App\Data;
 
  class SearchData {

        /**
         * @var int
         */
        public $page=1;

       /**
        * @var string
        */
       public $q = '';

      /**
       * @var category[]
       */
       public $categories = [];

       /**
        * @var null|integer
        */
        public $max;

        /**
        * @var null|integer
        */
        public $min;
         /**
          * @var boolean
          */
          public $promo = false;
  }