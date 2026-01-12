using Microsoft.AspNetCore.Mvc;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinancialController : ControllerBase
{
    private readonly FinancialService _financialService;

    public FinancialController(FinancialService financialService)
    {
        _financialService = financialService;
    }

    [HttpGet("account-data")]
    public async Task<IActionResult> GetAccountData()
    {
        var results = await _financialService.GetAccountDataAsync();
        if (results == null)
            return NotFound("No account data found.");

        return Ok(results);
    }

    [HttpGet("user-preferences")]
    public async Task<IActionResult> GetUserPreferences()
    {
        var results = await _financialService.GetUserPreferencesAsync();
        if (results == null)
            return NotFound("No user preferences found.");

        return Ok(results);
    }

    [HttpGet("account-value-and-nickname")]
    public async Task<IActionResult> GetAccountValueAndNickName()
    {
        var results = await _financialService.GetAccountValueAndNickNameAsync();
        if (results == null)
            return NotFound("No account value and nickname data found.");

        return Ok(results);
    }

    [HttpGet("transaction-data")]
    public async Task<IActionResult> GetTransactionData([FromQuery] string month)
    {
        var results = await _financialService.GetTransactionDataAsync(month);
        if (results == null)
            return NotFound("No transaction data found.");
        return Ok(results);
    }
}
