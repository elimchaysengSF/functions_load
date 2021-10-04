public with sharing class FunctionApex {
    public static void test() {
        System.debug('Invoking myfunction');

        functions.Function myFunction = functions.Function.get('functions_load.processlargedatajs');
        functions.FunctionInvocation invocation = myFunction.invoke('{"latitude": "51.16", "longitude": "-164.14", "length": 20}');
        String jsonResponse = invocation.getResponse();
    
        System.debug('Response from myfunction ' + jsonResponse);
    }
}
