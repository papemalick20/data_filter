<?php

namespace App\Controller;

use App\Data\SearchData;
use App\Form\SearchForm;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    /**
     * @Route("/", name="product")
     */
    public function index(Request $request, ProductRepository $productRepository): Response
    {
        $data = new SearchData();
        $data->page=$request->get('page', 1);
        $form = $this->createForm(SearchForm::class,$data);
        $form->handleRequest($request);
        [$min, $max] = $productRepository->findMinMax($data);
       
        $products =$productRepository->findSearch($data);
        if($request->isXmlHttpRequest()){
            return new JsonResponse([
                'content'=> $this->renderView('product/_product.html.twig',['products'=> $products]),
                'sorting'=> $this->renderView('product/_sorting.html.twig',['products'=> $products])
            ]);
        }
        return $this->render('product/index.html.twig', [
            'products' => $products,
            'form'=> $form->createView(),
            'min'=> $min,
            'max'=> $max
        ]);
    }
}
