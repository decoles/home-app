using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

using Backend.Utilities;
using Backend.Models;
using Backend.Services;
using System.Text.Json;

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

    [HttpGet("transaction-data")]
    public async Task<IActionResult> GetTransactionData([FromQuery] string month)
    {
        var results = await _financialService.GetTransactionDataAsync(month);
        if (results == null)
            return NotFound("No transaction data found.");
        return Ok(results);
    }

    [HttpPost("set-tags")]
    public async Task<IActionResult> SetTags([FromBody] List<Tag> tags)
    {
        if (tags == null || tags.Count == 0)
            return BadRequest("No tags provided.");

        var result = await _financialService.SetTagsAsync(tags);
        if (!result)
            return StatusCode(StatusCodes.Status500InternalServerError, "Failed to set tags.");

        return Ok("Tags set successfully.");
    }

    [HttpGet("get-tags")]
    public async Task<IActionResult> GetTags()
    {
        var t = await _financialService.GetTagsAsync();
        if (t == null || t.Count == 0)
            return  StatusCode(StatusCodes.Status204NoContent, "No Tags found.");
        return Ok(t);
    }
}
