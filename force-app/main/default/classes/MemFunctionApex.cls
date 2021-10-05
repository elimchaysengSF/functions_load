/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 06-17-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   06-15-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class MemFunctionApex {
    public static void test(Decimal num) {
        System.debug('Invoking memoryfunction');

        functions.Function memoryFunction = functions.Function.get('functions_load.memoryfunction');
        String payload = '{"Iterations" : ' + num + '}'; //num is in millions of iterations
        System.debug('Payload:' + payload);
        functions.FunctionInvocation invocation = memoryFunction.invoke(payload);
        String strResponse = invocation.getResponse();

        System.debug('Response from memoryfunction:' + strResponse);
    }
}
